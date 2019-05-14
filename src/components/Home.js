import React from 'react';

const Home=({dTDate, dTValue, loadingDT})=>{
  return(
      <h2 className='text-center'>{!loadingDT?`Dolar hoy ${dTDate} / $ ${dTValue}`:'cargando...'}</h2> 
  )
}

export default Home; 