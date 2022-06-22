import React from "react";
import { Container, Row, Col, Alert, Figure, Button } from "react-bootstrap";
import { gql, useQuery } from "@apollo/client";
const ARTICLES = gql` 

query Article($id: ID!) { 
        categories(sort: ["nazev"]) {
            data {
                id
                attributes {
                    obrazek
                    nazev
                    stat
                    roky
                    informace
                    zanrs {
                        data {
                            attributes {
                            zanr
                            }
                        }
                    }
                }
            }
        }
    }
}
`;

export const ArticlesGrid = () => {
    const { loading, error, data } = useQuery(ARTICLES);
    if (loading) return <p>Probíhá načítání stránky...</p>;
    if (error) return (
        <Container>
            <Alert variant="danger">Došlo k chybě: {JSON.stringify(error)}</Alert>
        </Container>
    );
    if (data.articles.data.length > 0)
        return (
            <Container fluid>
                <Row sm={1} md={2} lg={3}>
                    {data.articles.data.map((article) => (
                        <Col key={article.id}>

                            <div className="border p-2 m-2">
                                <h3>{article.categories.data.attributes.nazev}</h3>
                                {article.attributes.image.data && (
                                    <Figure>
                                        <Figure.Image
                                            alt={article.categories.data.attributes.nazev}
                                            src={`${process.env.REACT_APP_BACKEND_URL}${article.attributes.image.data.attributes.url}`}
                                            rounded
                                        />
                                        <Figure.Caption>
                                            Obrázek: {article.categories.data.attributes.nazev}
                                        </Figure.Caption>
                                    </Figure>
                                )}
                                <p>{article.categories.data.attributes.informace.substring(0, 50)}...</p>
                                <Button
                                    variant="outline-danger"
                                    href={`/articles/${article.id}`}
                                >
                                    Podrobnosti
                                </Button>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        );
    else
        return (
            <Container>
                <Alert variant="warning">Nebyl nalezen žádný článek</Alert>
            </Container>
        );
};