import React from "react";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import { gql, useQuery } from "@apollo/client";
import { BlockHeading } from "../components/BlockHeading";
import { Link } from "react-router-dom";

export default function Homepage() {
  const HOMEPAGE_QUERY = gql`
  query{
    categories{
      data{
        id
        attributes{
          nazev
          obrazek{
            data{
              attributes{
                url
              }
            }
          }
        }
      }
    }
  }
  `;
  const { data, loading, error } = useQuery(HOMEPAGE_QUERY)
  if (loading) return <p>Probíhá načítání stránky...</p>;
  if (error) return <p>Došlo k chybě: {JSON.stringify(error)}</p>;
  else if (data) {
    return (
      <Container fluid>
        <Col>
          <BlockHeading title="Umělci" />
        </Col>
        <Row xs={1} sm={1} md={2} lg={5}>
          {data.categories.data.map((item, index) => {
            return (
              <div className="card">
                <Link to={"/kapely/" + item.id}><h2 className="bg-danger text-white p-3">{item.attributes.nazev}</h2></Link>
                <img src={"http://localhost:1337" + item.attributes.obrazek.data.attributes.url}></img>
              </div>
            )
          })}
        </Row>
      </Container>
    );
  }

}
