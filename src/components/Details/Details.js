import React from 'react';
import { getNewsChannel, formatLastUpdate } from '../../config/config';
import './Details.css';

function Details({ channel, published, author }) {
  return (
    <div style={{ margin: '20px 0' }}>
      <p className="channel ellipsis">
        <span>Channel: </span>
        {getNewsChannel(channel)}
      </p>
      <p className="published">
        <span>Published at: </span>
        {formatLastUpdate(published)}
      </p>
      <p className="author ellipsis">
        <span>Author: </span>
        {author}
      </p>
    </div>
  );
}

export default Details;
