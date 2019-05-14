import React, {PureComponent} from 'react';
import {Line} from 'react-chartjs-2';

class Chart extends PureComponent{

  static defaultProps = {
    displayTitle:true,
    displayLegend: false,
    legendPosition:'right',
    location:'City'
  }

  render(){
    const valores=this.props.dValues;
    let suma=0;
    valores.forEach(item => {
      suma+= item
    });
    var min=Math.min.apply(null, valores);
    var max=Math.max.apply(null, valores);
    
    const promedio= suma/valores.length;
    
    if (this.props.loadingChart) {
      return (
        <div className="chart">
          <Line
            data={this.props.chartData}
            options={{
              title:{
                display:this.props.displayTitle,
                text:`Monto mayor: $${max}  Monto menor: $${min}  Promedio: $${promedio.toFixed(2)}`,
                fontSize:18
              },
              legend:{
                display:this.props.displayLegend,
                position:this.props.legendPosition
              }
            }}
          />
        </div>
      )
    }
    else{
      return(<h3>Cargando Gráfica...</h3>)
    }
  }
}

export default Chart;
