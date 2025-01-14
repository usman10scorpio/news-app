import { useSelector } from "react-redux";
import { Container, Header, card } from "../Styled/index";
import { Col, Row } from "react-bootstrap";
import { header, capitalizeString } from "../../config/config";
import { NewsCard } from "../index";
import Loading from "../Loading/Loading";
import "./News.css";

function News({ personalized }) {
  const personalizedClass = personalized ? "personalized" : "";

  let { articles, status, filters } = useSelector((state) => state.articles);
  articles = personalized ? personalized : articles;

  const heading = personalized ? "personalized" : (filters.query) ? filters.query : filters.category;

  return (
    <>
      {status === "loading" ? (
        <Loading />
      ) : (
        <div className={personalizedClass}>
          {articles?.length < 1 ? (
            <div style={{'text-align': 'center'}}>No results found !</div>
          ) : (
            <Container>
            <Header>{header(capitalizeString(heading))}</Header>
              <Row>
                {articles.map((element, index) => {
                  return (
                    <Col sm={12} md={6} lg={4} xl={3} style={card} key={index}>
                      <NewsCard
                        title={element.title}
                        published={element.publishedAt}
                        channel={element.source}
                        alt="News image"
                        publishedAt={element.publishedAt}
                        imageUrl={element.imgSrc}
                        urlNews={element.url}
                        author={element.author}
                      />
                    </Col>
                  );
                })}
              </Row>
            </Container>
          )}
        </div>
      )}
    </>
  );
}

export default News;
