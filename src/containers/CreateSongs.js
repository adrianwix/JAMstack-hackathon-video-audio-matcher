import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import FormCreateSongs from '../presentational/FormCreateSongs';
import { throwServerError } from 'apollo-link-http-common';

const POST_SONG_MUTATION = gql`
	mutation PostSong(
		$title: String!
		$artist: String!
		$url: String!
		$genre_id: Int!
	) {
		insert_songs(
			objects: {
				title: $title
				artist: $artist
				url: $url
				genre_id: $genre_id
			}
		) {
			returning {
				id
				title
				artist
				url
				genre_id
			}
		}
	}
`;

const GET_GENRES = gql`
	query GetGenreIds {
		music_genre {
			id
			name
		}
	}
`;

class CreateSongs extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			artist: '',
			url: '',
			genre_id: 0,
		};
		this.handleState = this.handleState.bind(this);
		this.resetState = this.resetState.bind(this);
	}
	/**
	 *
	 * @param {string} state Part of state to modify
	 * @param {*} value New state value
	 */
	handleState(state, e) {
		this.setState({ [state]: e.target.value });
	}
	/**
	 * @description Set the default values of state
	 */
	resetState() {
		this.setState({
			title: '',
			artist: '',
			url: '',
			genre_id: '',
		});
	}
	render() {
		const { title, artist, url, genre_id } = this.state;

		return (
			<Query query={GET_GENRES}>
				{propsQuery => (
					<Mutation
						mutation={POST_SONG_MUTATION}
						variables={{ title, artist, url, genre_id: parseInt(genre_id) }}
					>
						{(postMutation, propsMutation) => (
							<FormCreateSongs
								propsQuery={propsQuery}
								propsMutation={propsMutation}
								postMutation={postMutation}
								title={title}
								artist={artist}
								url={url}
								genre_id={genre_id}
								handleState={this.handleState}
								resetState={this.resetState}
							/>
						)}
					</Mutation>
				)}
			</Query>
		);
	}
}
export default CreateSongs;
