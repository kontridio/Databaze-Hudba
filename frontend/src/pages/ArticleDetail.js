import React from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Figure } from "react-bootstrap";
import { gql, useQuery } from "@apollo/client";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";

export default function Articles() {
    const ARTICLE = gql` 

    query Article($id:ID!) { 
        category(id:$id){
            data {
                id
                attributes {
                    obrazek{
                      data{
                        attributes{
                          url
                        }
                      }
                    }
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

`;
    const { id } = useParams();
    const { loading, error, data } = useQuery(ARTICLE, { variables: { id: id } });
    if (loading) return <p>Probíhá načítání stránky...</p>;
    if (error) return <p>Došlo k chybě: {JSON.stringify(error)}</p>;
    return (
        <Row p-5>
            <h2 className="text-danger bg-light p-3 m-3 text-center">
                {data.category.data.attributes.nazev}
            </h2>
            <Col>
                <ReactMarkdown
                    children={data.category.data.attributes.informace}
                    remarkPlugins={[remarkGfm]}
                />
                
                    <Figure>
                        <Figure.Image
                            alt={data.category.data.attributes.nazev}
                            src={"http://localhost:1337"+data.category.data.attributes.obrazek.data.attributes.url}
                        />
                        <Figure.Caption>Obrázek: {data.category.data.attributes.nazev}</Figure.Caption>
                    </Figure>
            </Col>
            <Col>
                <h4 className="bg-danger text-white p-3">Stát</h4>
                <p className="text-danger bg-light p-3 m-3 text-center">
                    {data.category.data.attributes.stat}
                </p>
                <h4 className="bg-danger text-white p-3">Roky působení</h4>
                <p className="text-danger bg-light p-3 m-3 text-center">
                    {data.category.data.attributes.roky}
                </p>
                <h4 className="bg-danger text-white p-3">Žánr</h4>
                <p className="text-danger bg-light p-3 m-3 text-center">
                    {data.category.data.attributes.zanrs.data.attributes}
                </p>
            </Col>
        </Row>
    );
} 