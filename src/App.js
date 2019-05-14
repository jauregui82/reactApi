import React, { Component } from 'react';
import moment from 'moment';
import 'moment-timezone';
import './App.css';

import Home from './components/Home';
import Form from './components/Form';
import Chart from './components/Chart';


moment.locale('es-ES');
const baseApi='https://api.sbif.cl/api-sbifv3/recursos_api/dolar';
const apiKey='?apikey=9c84db4d447c80c74961a72245371245cb7ac15f&formato=json';

class App extends Component {
  constructor(){
    super();
    this.state={
      chartData:[],
      count:0,
      dTDate:'',
      dTValue:'',
      loadingDT:false,
      loadingChart:false,
      dValues:[]
    }
  }
  componentDidMount(){
    this.fetchDolarToday();
  }

  parseUrl=({fechaIni, fechaEnd})=>{
    const dateMomentStart= moment(fechaIni, 'YYYY-MM-DD');
    const yearIni= dateMomentStart.format('YYYY');
    const monthIni= dateMomentStart.format('MM');
    const dayIni= dateMomentStart.format('DD');

    const dateMomentEnd= moment(fechaEnd, 'YYYY-MM-DD');
    const yearEnd= dateMomentEnd.format('YYYY');
    const monthEnd= dateMomentEnd.format('MM');
    const dayEnd= dateMomentEnd.format('DD');

    const url= `${baseApi}/periodo/${yearIni}/${monthIni}/dias_i/${dayIni}/${yearEnd}/${monthEnd}/dias_f/${dayEnd}/${apiKey}`;

    return url
  }

  handleSubmit = async (dates) =>{
    const url = this.parseUrl(dates);
    const response = await this.fetchDolarsByDate(url); 
    
    if (response.Dolares) {
      this.buildDataSet(response.Dolares);
    }
  }

  buildDataSet=(dolars)=>{
    const labels = [];
    const data = [];
    const color = [];
    const count = dolars.length;

    dolars.forEach(({Valor, Fecha})=>{
      labels.push(Fecha);
      data.push(parseFloat(Valor.replace(',', '.')));
      color.push('blue');
    })
    
    const chartData = {
      labels,
      datasets:[{data,
        backgroundColor:['rgba(255, 99, 132, 0.6)'],
        borderColor: ['rgba(255, 99, 132, 1)'],
        pointBackgroundColor: color
      }],
    };
    this.setState(state=>({...state,...{chartData, count, loadingChart:true, dValues:data}}));
  }

  fetchDolarsByDate = async (url) => {
    const response = await fetch(url);
    if(response && response.status === 200){
      
      const body= await response.json();
      return body;
    }else if(response.CodigoError){
      return false;
    }
    return false;
  }
  fetchDolarToday=async()=>{
    this.setState(state=>({...state,...{loadingDT:true}}));

    const dateMomentToday= moment();
    const yearIni= dateMomentToday.format('YYYY');
    const monthIni= dateMomentToday.format('MM');
    const dayIni= dateMomentToday.format('DD');

    const res= await fetch(`${baseApi}/${yearIni}/${monthIni}/dias/${dayIni}/${apiKey}`)
    const data= await res.json();
    const dolars=data.Dolares;

    if (dolars!== undefined) {
      const {Fecha, Valor} = dolars[0];
      const dTDate = moment(Fecha,'YYYY-MM-DD').format('DD-MM-YYYY')
      const dTValue = parseFloat(Valor.replace(',', '.'));
      this.setState(state=>({...state,...{dTDate, dTValue,loadingDT:false}}));       
    } 
    else{
      this.setState(state=>({...state,...{loadingDT:false}}));       

    }
  }


  render() {
    const {count, chartData, dTDate, dTValue, loadingDT, loadingChart, dValues} = this.state;
    return (
      <div className='container p-4 '>
        <h1>{this.props.title}</h1>
        <Home loadingDT={loadingDT} dTDate={dTDate} dTValue={dTValue}/>
        <Form handleSubmit={this.handleSubmit}/>
        {count > 0 && <Chart chartData={chartData} dValues={dValues} loadingChart={loadingChart}/>}
      </div>
    );
  }
}

export default App;
