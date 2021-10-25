import React from "react";
import ReactDOM from "react-dom";
import "./form.css";

export default class DynamicForm extends React.Component {
  state = {
  };

  constructor(props) {
    super(props);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("current: ", nextProps.defaultValues, "previousState: ", prevState);
    let derivedState = {};

    if (
      nextProps.defaultValues &&
      nextProps.defaultValues.id !== prevState.id
    ) {
      console.log("INSIDE THIS CONDITION");
      return {
        ...nextProps.defaultValues
      };
    }

    //console.log("no state change");
    return null;
  }


  onSubmit = e => {
    e.preventDefault();
    if (this.props.onSubmit) this.props.onSubmit(this.state);
  };

  onChange = (e, key, type = "single") => {
    if (type === "single") {
      this.setState(
        {
          [key]: e.target.value
        },
        () => {}
      );
    } else {
      let found = this.state[key]
        ? this.state[key].find(d => d === e.target.value)
        : false;

      if (found) {
        let data = this.state[key].filter(d => {
          return d !== found;
        });
        this.setState({
          [key]: data
        });
      } else {
        let others = this.state[key] ? [...this.state[key]] : [];
        this.setState({
          [key]: [e.target.value, ...others]
        });
      }
    }
  };

  renderForm = () => {
    let model = this.props.model;

    let formUI = model.item.map(m => {
      let key = m.linkId;
      let type = m.type || "text";
      let name = m.text;
      let value = "";
      let booleanOptions = [{name: m.linkId, label: "True", value: "true", key: "true"},
        {name: m.linkId, label: "False", value: "false", key:"false" }];

      let target = key;
      value = this.state[target] || "";

      let inputType = "text";
      if(inputType === "string") {
        inputType = "text";
      }

      let input = (
        <input
          className="form-input"
          type={type}
          key={m.text}
          name={name}
          value={value}
          onChange={e => {
            this.onChange(e, target);
          }}
        />
      );

      if (type == "boolean") {
        input = booleanOptions.map(o => {
          let checked =  o.value == value;
          return (
            <React.Fragment key={"fr" + o.key}>
              <input
                className="form-input"
                type="radio"
                key={o.key}
                name={o.name}
                checked={checked}
                value={o.value}
                onChange={e => {
                  this.onChange(e, m.linkId);
                }}
              />
              <label key={"ll" + o.key}>{o.label}</label>
            </React.Fragment>
          );
        });
        input = <div className="form-group-radio">{input}</div>;
      }

      if (type == "choice") {
        input = m.option.map(o => {
          return (
            <option
              className="form-input"
              key={o.valueCoding.display}
              value={o.valueCoding.code}
            >
              {o.valueCoding.display}
            </option>
          );
        });

        input = (
          <select
            value={value}
            onChange={e => {
              this.onChange(e, m.linkId);
            }}
          >
            {input}
          </select>
        );
      }

      return (
        <div key={"g" + key} className="form-group">
          <label className="form-label" key={"l" + key} htmlFor={key}>
            {m.text}
          </label>
          {input}
        </div>
      );
    });
    return formUI;
  };

  render() {
    let title = this.props.title || "Dynamic Form";

    return (
      <div className={this.props.className}>
        <h3 className="form-title">Questionnaire</h3>
        <div className="form-actions" style={{ color: 'red' }}>{this.props.error ? this.props.error : ""}</div>
        <form
          className="dynamic-form"
          onSubmit={e => {
            this.onSubmit(e);
          }}
        >
          {this.renderForm()}
          <div className="form-actions">
            <button type="submit">submit</button>
          </div>
        </form>
      </div>
    );
  }
}
