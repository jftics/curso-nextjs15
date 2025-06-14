'use client'

import DemoCssModules from "./components/DemoCssModules";
import DemoSass from "./components/DemoSass";
import DemoTailwindcss from "./components/DemoTailwindcss";

export default function HomePage(){
  return(
    <div>

      <div>
        <h2>CSS Modules</h2>
        <DemoCssModules title="Laptop" description="La mejor laptop" price={1000}></DemoCssModules>
        <br></br>
        <hr></hr>
        <br></br>
      </div>

       <div>
        <h2>Sass</h2>
        <DemoSass variant="primary" size="lg" onClick={() => console.log('Clicked!')}>
          Enviar formulario
        </DemoSass>

        <DemoSass variant="success" size="sm">
          Guardar
        </DemoSass>

        <DemoSass variant="danger" disabled>
          Eliminar
        </DemoSass>
        <br></br>
        <hr></hr>
        <br></br>
      </div>

       <div>
        <h2>Tailwindcss</h2>
        <DemoTailwindcss></DemoTailwindcss>
        <br></br>
        <hr></hr>
        <br></br>
      </div>
    </div>
    
  )  
}

