import React, { Component } from 'react';
import TinyMCE from 'react-tinymce';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

class CreateThread extends Component {

    constructor(props) {
        super(props);

        this.state = {
            async: 'ready'
        }
    }

    parseId = (id) => {
        return /^\d+/.exec(id);
    };

    handleCreateThread = () => {
        if(this.state.async === 'ready') {
            this.setState({ async: 'waiting'});
            const html = tinymce.get('test').getContent();
            const title = document.getElementById("title-input").value;

            this.props.createThread(title, this.parseId(this.props.params.id), html, (responseCode) => {
                switch (responseCode) {
                    case 1:
                        this.setState({ async: 'ready' });
                        break;
                }
            });
        }
    };

    render() {
        return (
            <div className="flex">
                <div className="posting-wrapper">
                    <div className="category-header-wrapper">
                        <div className="category-name">Create a Thread</div>
                    </div>

                    <div className="posting-input-wrapper">
                        <fieldset className="title-group">
                            <label >Title:</label>
                            <input id="title-input" type="text" className="form-control"/>
                        </fieldset>

                        <TinyMCE id="test"
                                 content=""
                                 config={{
                                     height: 350,
                                     plugins: [
                                         'advlist autolink lists link image charmap preview hr anchor pagebreak',
                                         'searchreplace wordcount visualblocks visualchars code fullscreen',
                                         'insertdatetime media nonbreaking save table contextmenu directionality',
                                         'emoticons template paste textcolor colorpicker textpattern imagetools'
                                     ],
                                     toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
                                     toolbar2: 'preview media | forecolor backcolor emoticons'
                                 }}
                        />
                        <button onClick={this.handleCreateThread} className="form-button">Create</button>
                    </div>
                </div>
            </div>

        )
    }

}

export default connect(null, actions)(CreateThread);