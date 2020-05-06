import React from 'react';

function ProgressBar( props ) {
    let estilo = {
        width: (props.avance * 16.66) + "%"
    };

    return (<div className="progress">
        <div className="progress-bar progress-bar-striped bg-info progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={estilo}></div>
    </div>);
}

export default ProgressBar;