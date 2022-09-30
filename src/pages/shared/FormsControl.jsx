import React, { Fragment } from "react";
import NumberFormat from "react-number-format";
import { Form, Button, InputGroup, FormControl } from "react-bootstrap";

class FormsControl {
  static Text(props) {
    return (
      <Fragment>
        <Form.Group className={props.className}>
          <Form.Label>
            {props.label}{" "}
            {props.required && <span className="text-danger">*</span>}
          </Form.Label>
          <Form.Control
            placeholder={props.placeholder}
            required={props.required}
            type={props.type}
            onFocus={props.onFocus}
            value={props.value}
            onChange={props.onChange}
          />
          {props.required && (
            <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
          )}
        </Form.Group>
      </Fragment>
    );
  }

  static Textarea(props) {
    return (
      <Form.Group  className={props.className}>
        <Form.Label>
        {props.label}{" "}
            {props.required && <span className="text-danger">*</span>}
        </Form.Label>
        <Form.Control
          as="textarea"
          placeholder={props.placeholder}
          value={props.value}
          required={props.required}
          onFocus={props.onFocus}
          onChange={props.onChange}
        />
        <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
      </Form.Group>
    );
  }

  static NumberFormat(props) {
    let withValueLimit = false;
    if (props.max) {
      withValueLimit = ({ floatValue }) => floatValue <= props.max;
    }
    return (
      <Form.Group className={props.className}>
        <Form.Label style={{marginBottom:'0px'}}>
          {props.label}{" "}
          {props.required && <span className="text-danger">*</span>}
        </Form.Label>
        {withValueLimit && (
          <NumberFormat
            name={props.name}
            id={props.id}
            data-mformat={props.datamformat}
            format={props.format}
            isAllowed={withValueLimit}
            className={props.className + " form-control"}
            required={props.required}
            placeholder={props.placeholder}
            allowNegative={props.allowNegative}
            suffix={props.suffix}
            value={props.value}
            onValueChange={props.onValueChange}
            onFocus={props.onFocus}
          />
        )}

        {!withValueLimit && (
          <NumberFormat
            name={props.name}
            id={props.id}
            format={props.format}
            data-mformat={props.dataMformat}
            className={props.className + " form-control"}
            required={props.required}
            placeholder={props.placeholder}
            allowNegative={props.allowNegative}
            suffix={props.suffix}
            value={props.value}
            onValueChange={props.onValueChange}
            onFocus={props.onFocus}
          />
        )}

        <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
      </Form.Group>
    );
  }

  static InputSearch(props) {
    return (
      <Form.Group>
        <Form.Label>{props.label}</Form.Label>
        <InputGroup className="mb-3">
          <FormControl
            id={props.id}
            name={props.name}
            className={props.className}
            required
            type={props.type}
            data-mformat={props.dataMformat}
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}
            onFocus={props.onFocus}
          />
          <Button variant="primary" onClick={props.onClick}>
            {props.labelButton}
          </Button>
          <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
    );
  }

  static DataFormatSearch(props) {
    return (
      <Form.Group>
        <Form.Label>{props.label}</Form.Label>
        <InputGroup className="mb-3">
          <NumberFormat
            placeholder={props.placeholder}
            required={props.required}
            id={props.id}
            name={props.name}
            data-mformat={props.dataMformat}
            type={props.type}
            format={props.format}
            className={props.className}
            value={props.value}
            onValueChange={props.onValueChange}
            onFocus={props.onFocus}
          />
          <Button variant="primary" onClick={props.onClick}>
            {props.labelButton}
          </Button>
          <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
    );
  }
}

export default FormsControl;
