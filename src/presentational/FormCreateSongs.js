import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class FormCreateSongs extends Component {
	render() {
		const {
			propsQuery,
			propsMutation,
			postMutation,
			handleState,
			resetState,
			title,
			artist,
			url,
			genre_id,
		} = this.props;
		const { loading, error, data } = propsQuery;

		if (loading) return 'Loading...';
		if (error) return `Error! ${error.message}`;

		return (
			<div className="row mt-4">
				<div className="col-md-6 mx-auto">
					<h1>Register your songs here!</h1>
					<form
						onSubmit={e => {
							e.preventDefault();
							postMutation();
							// resetState();
						}}
					>
						<div className="form-group">
							<label htmlFor="title">Title</label>
							<input
								id="title"
								className="form-control"
								value={title}
								onChange={e => handleState('title', e)}
								type="text"
								placeholder="Song title"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="artist">Artist</label>
							<input
								id="artist"
								className="form-control"
								value={artist}
								onChange={e => handleState('artist', e)}
								type="text"
								placeholder="Artist"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="genre">Select musical genre</label>
							<select
								id="genre"
								className="form-control"
								onChange={e => handleState('genre_id', e)}
								value={genre_id}
							>
								<option value="">Genres</option>
								{data.music_genre.map(audio => (
									<option key={audio.id} value={audio.id}>
										{audio.name}
									</option>
								))}
							</select>
						</div>
						<div className="form-group">
							<label htmlFor="url">Music URL</label>
							<input
								id="url"
								className="form-control"
								value={url}
								onChange={e => handleState('url', e)}
								type="text"
								placeholder="www.mymusicstorage.com/mysong.mp3"
							/>
							<small id="urlHelp" className="form-text text-muted">
								Please submit a url pointing to your music. Ending must be a
								valid music format
							</small>
						</div>
						<button className="btn btn-primary mb-4" type="submit">
							Submit
						</button>
					</form>
				</div>
			</div>
		);
	}
}
