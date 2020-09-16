import React from 'react';

const InputAndHint = (props) => {
    if (props.memo) {
        return (
            <div className="field">
                <label className="label">{props.label}{(()=>{if (props.necessary) return <span className="necessary">*</span>; return undefined})()}</label>
                <div className="control has-icons-left has-icons-right">
                    <input name={props.name} className={`input ${(props.memo.length === 0 ? "" : "is-danger")}`} type={props.type} placeholder={props.placeHolder} value={props.value} onChange={props.onChange}/>
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
            <label className="label">{props.label}{(()=>{if (props.necessary) return <span className="necessary">*</span>; return undefined})()}</label>
            <div className="control has-icons-left">
                <input name={props.name} className="input" type={props.type} placeholder={props.placeHolder} value={props.value} onChange={props.onChange}/>
                <span key={Math.random()} className="icon is-small is-left">
                    <i className={props.iconLeft}></i>
                </span>
            </div>
        </div>
    );
}

export default InputAndHint;