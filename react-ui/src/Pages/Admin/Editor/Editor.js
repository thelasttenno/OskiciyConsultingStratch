import React, { Component } from 'react';
import { EditorState, Editor, convertToRaw, convertFromRaw } from 'draft-js';
import debounce from 'lodash/debounce';
import Button from "@mui/material/Button";

class EditorPage extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  saveContent = debounce((content) => {
    fetch('/postsTest', {
      method: 'POST',
      body: JSON.stringify({
        content: convertToRaw(content),
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
  }, 10000);

  onChange = async(editorState) =>  {
    const contentState = await editorState.getCurrentContent();
    this.saveContent(contentState);
    this.setState({
      editorState,
    });
  }
  _onSave = async() => {
    const contentState = await this.state.editorState.getCurrentContent();
    this.saveContent(contentState);
    this.setState({
      editorState,
    });
  }
  componentDidMount() {
    fetch('/postsTest').then(val => val.json())
    .then(rawContent => {
      console.log(rawContent);
      // if (rawContent !== []) {
      //   this.setState({ editorState: EditorState.createWithContent(convertFromRaw(rawContent)) })
      // } else {
        this.setState({ editorState: EditorState.createEmpty() });
      // }
    });
  }

  render() {
    if (!this.state.editorState) {
      return (
        <h3 className="loading">Loading...</h3>
      );
    }
    return (
      <div>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
        />
        <Button variant="outlined" onClick={this._onSave.bind(this)}>Save</Button>
      </div>
    );
  }
}

export default EditorPage;