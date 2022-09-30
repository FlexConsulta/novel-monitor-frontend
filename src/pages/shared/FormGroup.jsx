import React from 'react'
import Roles from "../shared/Roles";
import {
    Form,

} from "react-bootstrap";
export default function FormGroup({ action, profile, children, ...rest }) {

    return (
        <>
            {Roles.userHasPermission(profile, action) &&
                <Form.Group {...rest} >
                    {children}
                </Form.Group>
            }
        </>
    )
}
