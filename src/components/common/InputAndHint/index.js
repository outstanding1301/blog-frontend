import React from 'react';
import './style.scss';

const InputAndHint = (props) => {
    if (props.memo) {
        return (
            <div className="field">
                <label className="label">{props.label}{props.necessary && <span className="necessary">*</span>}</label>
                <div className="control has-icons-left has-icons-right">
                    <input name={props.name} className={`input ${(props.memo.length === 0 ? "" : "is-danger")}`} type={props.type} placeholder={props.placeHolder} value={props.value} onChange={props.onChange} autoComplete={props.autoComplete}/>
                    <span className="icon is-small is-left">
                        <i className={props.iconLeft}></i>
                    </span>
                    <span key={Math.random()} className="icon is-small is-right">
                        <i className={(props.memo.length === 0 ? "fas fa-check" : "fas fa-exclamation-triangle")}></i>
                    </span>
                </div>
                <p className="help is-danger"> {props.memo}</p>
            </div>
        );
    }
    return (
        <div className="field">
            <label className="label">{props.label}{props.necessary && <span className="necessary">*</span>}</label>
            <div className="control has-icons-left">
                <input name={props.name} className="input" type={props.type} placeholder={props.placeHolder} value={props.value} onChange={props.onChange} autoComplete={props.autoComplete}/>
                <span key={Math.random()} className="icon is-small is-left">
                    <i className={props.iconLeft}></i>
                </span>
            </div>
        </div>
    );
}

export default InputAndHint;