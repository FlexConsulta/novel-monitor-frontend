import React from "react";
import { Breadcrumb } from "react-bootstrap";
import './breadcrump.style.css'
import { Link } from "react-router-dom";


export default function Breadcrump(props) {
    return (
        <Breadcrumb className="bradcrumb">
            {props?.way?.map((elemento, index) => (
                <Breadcrumb.Item key={index} active={index === props.way.length - 1} >
                    {index === props.way.length - 1 ? elemento?.label :
                        <Link to={elemento?.rota}>{elemento?.label}</Link>}
                </Breadcrumb.Item>
            ))}
        </Breadcrumb>
    )
}