import React, { Component } from 'react';
import PropTypes from "prop-types";
import Type from "./Type";

export default class Option extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show_definition: props.show_definition
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleClick(event) {
        event.preventDefault();
        this.setState(prevState => ({
            show_definition: !prevState.show_definition
        }));
    };

    handleBlur() {
        this.setState({show_definition: false});
    };

    render() {
        const {cls, name, required, default_value, deprecated, deprecation_message, is_lazy, allowed_types, allowed_values, has_normalizer, version} = this.props;
        const show_definition = this.state.show_definition;
        const id = version + '/' + Type.getClassName(cls) + '/' + name;
        const stringify = JSON.stringify(default_value, null, ' ');
        const final_deprecation_message = deprecation_message ? deprecation_message : 'Some values has been deprecated.';

        return (
            <div title={required ? 'Required' : ''}
                 className={show_definition ? 'option-div selected' : 'option-div'}
                 onBlur={this.handleBlur}
            >
                <a href={'#' + id} id={id} className="option-link">﹟</a>
                <a href={'#' + id} onClick={this.handleClick}><code className={deprecated && 'deprecated'}>{name}</code>{required ? '*' : ''}</a>
                <div className="option-definition" hidden={!show_definition}>
                    {deprecated && <div>- Deprecated! {final_deprecation_message}</div>}
                    {undefined !== default_value && <div>- Default value: {'{}' === stringify ? '[object]' : stringify}</div>}
                    {is_lazy && <div>- Has lazy default function.</div>}
                    {allowed_types && <div>- Allowed types: {JSON.stringify(allowed_types, null, ' ')}</div>}
                    {allowed_values && <div>- Allowed values: {JSON.stringify(allowed_values, null, ' ')}</div>}
                    {has_normalizer && <div>- Has normalizer function.</div>}
                    {required && <div>- Required.</div> || <div>- Optional.</div>}
                </div>
            </div>
        )
    }
}

Option.propTypes = {
    cls: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    required: PropTypes.bool.isRequired,
    default_value: PropTypes.any,
    deprecated: PropTypes.bool,
    deprecation_message: PropTypes.string,
    is_lazy: PropTypes.bool,
    allowed_types: PropTypes.array,
    allowed_values: PropTypes.array,
    has_normalizer: PropTypes.bool,
};
