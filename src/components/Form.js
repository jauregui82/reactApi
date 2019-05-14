import React, { Component } from 'react';
import moment from 'moment';
import 'moment-timezone';

moment.locale('es-ES');

class Form extends Component{
    constructor(){
        super();
        this.state = {
            fechaIni:'',
            fechaEnd:''
        }
    }
    
    handleInputDate=(e)=>{
        const {value, name}= e.target;
        this.setState({
            [name]:value
        })
    }

    handleValidSubmit=()=>{
        let result= true;
        const {fechaIni,fechaEnd} = this.state;
       
        if (fechaIni) {
            if (document.querySelector('#erroIni').classList.contains('fagError')) {
                document.querySelector('#erroIni').style.display='none';
                result= true;
            }
        }
        else{
            document.querySelector('#erroIni').innerHTML='Debe ingresar una fecha de inicio';
            document.querySelector('#erroIni').style.display='block';
            document.querySelector('#erroIni').classList.add('fagError');
            result= false;
        } 
        
        if (fechaEnd) {
            if (document.querySelector('#erroEnd').classList.contains('fagError')) {
                document.querySelector('#erroEnd').style.display='none';
                result= true;
            }    
        } 
        else{
            document.querySelector('#erroEnd').innerHTML='Debe ingresar una fecha de Fin';
            document.querySelector('#erroEnd').style.display='block';
            document.querySelector('#erroEnd').classList.add('fagError');
            result= false;
        }             
        return result;  
    }

    
    handleSubmit=(e)=>{
        
        e.preventDefault();
        if (this.handleValidSubmit()) {
            const {fechaIni,fechaEnd} = this.state;
            this.props.handleSubmit({
                fechaIni,fechaEnd
            })
        }
    }
    render(){
        return(
        <div className="card">
            <div className='card-header text-center'>
                <h4>Consulta en valor del dolar en un rango de fechas segun la SBIF</h4>
            </div>
            <form onSubmit={this.handleSubmit} className="card-body">
                <div className='row'>
                    <div className="form-group col-md-6">
                        <label>Fecha de inicio</label>
                        <input
                            type="date"
                            name="fechaIni"
                            className="form-control"
                            onChange={this.handleInputDate}
                            placeholder="Fecha Inicio"
                            max={moment().format('YYYY-MM-DD')}
                            />
                        <label id='erroIni' className='error'>Errorrrr</label>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Fecha de fin</label>
                        <input
                            type="date"
                            name="fechaEnd"
                            className="form-control"
                            onChange={this.handleInputDate}
                            placeholder="Responsible"
                            max={moment().format('YYYY-MM-DD')}
                            />
                        <label id='erroEnd' className='error'></label>
                    </div>
                </div>
                <div className='text-center card-footer'>
                    <button type="submit" className="btn btn-primary">Consultar</button>
                </div>
            </form>
        </div>
        )
    }
}

export default Form;