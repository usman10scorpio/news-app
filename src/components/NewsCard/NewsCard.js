import React from "react";
import { Button, Card } from "react-bootstrap";
import { Details } from "../index";
import "./NewsCard.css"; 

function NewsCard({ imageUrl, alt, title, channel, published, urlNews, author }) {
  
  return (
    <Card className="card">
      <Card.Img className="card-img" variant="top" src={imageUrl} alt={alt} />
      <Card.Body>
        <Card.Title className="ellipsis">{title}</Card.Title>
        <Details channel={channel} published={published} author={author} />
        <Button
          className="card-btn"
          href={urlNews}
          target="_blank"
          variant="secondary"
        >
          Read more
        </Button>
      </Card.Body>
    </Card>
  )
}

export default NewsCard