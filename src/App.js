import React, { Component } from "react";
import DynamicForm from "./components/DynamicForm";
import "./App.css";

class App extends Component {
  state = {
    data: [ {
      id: "f201",
      1: "true",
      2: "female",
      3: "2000-01-01",
      4: "India",
      5: "single",
      6: "false",
      7: "false"
    }],
    current: {},
    error: "",
    newForm: true,
    editForm: false

  };

  onSubmit = model => {
      const modelCopy = model;
      if(!modelCopy[1]) {
          this.setState({ error: "Please select if you have allergies"});
          return;
      }

      if(!modelCopy[2]) {
          this.setState({ error: "Please select your gender"});
          return;
      }

      if(!modelCopy[3]) {
          this.setState({ error: "Please select your date of birth"});
          return;
      }

      if(!modelCopy[4]) {
          this.setState({ error: "Please enter your country of birth"});
          return;
      }

      if(!modelCopy[5]) {
          this.setState({ error: "Please select your marital status"});
          return;
      }

      if(!modelCopy[6]) {
          this.setState({ error: "Please select if you smoke"});
          return;
      }

      if(!modelCopy[7]) {
          this.setState({ error: "Please select if you drink alcohol"});
          return;
      }

      let data = [];

      if (model.id) {
          data = this.state.data.filter(d => {
              return d.id != model.id;
          });
      } else {
          model.id = +new Date().getTime();
          data = this.state.data.slice();
      }

      if(this.state.editForm) {
          this.setState({
              data: [model, ...data],
              current: {},
              error: "",
              newForm: true,
              editForm: false
          });

      } else {
          this.setState({
              data: [model, ...data],
              current: model,
              error: "",
              newForm: true,
              editForm: false
          });
      }

  };

  onEdit = id => {
    let record = this.state.data.find(d => {
      return d.id == id;
    });
    this.setState({
        editForm: true,
        newForm: false,
      current: record
    });
  };

  onNewClick = e => {
    this.setState({
      current: {},
      error: "",
      newForm: true,
      editForm: false
    });
  };

  render() {
    let data = this.state.data.map(d => {
      return (
        <tr key={d.id}>
          <td>Allergies: {d[1]}</td>
          <td>Gender: {d[2]}</td>
          <td>Date of birth: {d[3]}</td>
          <td>Country of birth: {d[4]}</td>
          <td>Marital status: {d[5]}</td>
          <td>Smoke: {d[6]}</td>
          <td>Alcohol: {d[7]}</td>

          <td>
            <button
              onClick={() => {
                this.onEdit(d.id);
              }}
            >
              edit
            </button>
          </td>
        </tr>
      );
    });

    return (
      <div className="App">
          <div className="form-actions">
            <button onClick={this.onNewClick} type="submit">
                NEW
            </button>
          </div>
        <DynamicForm
          key={this.state.current.id}
          className="form"
          title="Questionnaire"
          defaultValues={this.state.current}
          error={this.state.error}
          newForm={this.state.newForm}
          editForm={this.state.editForm}
          model={{
            resourceType: "Questionnaire",
            id: "f201",
            url: "http://hl7.org/fhir/Questionnaire/f201",
            status: "active",
            subjectType: ["Patient"],
            date: "2021-08-12",
            item: [{
              linkId: "1",
              text: "Do you have allergies?",
              type: "boolean"
            }, {
              linkId: "2",
              text: "What is your gender?",
              type: "choice",
              option: [{
                valueCoding: {
                  system: "http://hl7.fhir/org",
                  code: "male",
                  display: "Male"
                }
              }, {
                valueCoding: {
                  system: "http://hl7.fhir/org",
                  code: "female",
                  display: "Female"
                }
              }, {
                valueCoding: {
                  system: "http://hl7.fhir/org",
                  code: "other",
                  display: "Other"
                }
              }]
            }, {
              linkId: "3",
              text: "What is your date of birth?",
              type: "date"
            }, {
              linkId: "4",
              text: "What is your country of birth?",
              type: "string"
            }, {
              linkId: "5",
              text: "What is your marital status?",
              type: "choice",
              option: [{
                valueCoding: {
                  system: "http://hl7.fhir/org",
                  code: "married",
                  display: "Married"
                }
              }, {
                valueCoding: {
                  system: "http://hl7.fhir/org",
                  code: "single",
                  display: "Single"
                }
              }, {
                valueCoding: {
                  system: "http://hl7.fhir/org",
                  code: "divorced",
                  display: "Divorced"
                }
              }]
            }, {
              linkId: "6",
              text: "Do you smoke?",
              type: "boolean"
            }, {
              linkId: "7",
              text: "Do you drink alcohol?",
              type: "boolean"
            }]}}
          onSubmit={model => {
            this.onSubmit(model);
          }}
        />

        <table border="1">
          <tbody>{data}</tbody>
        </table>
      </div>
    );
  }
}

export default App;
