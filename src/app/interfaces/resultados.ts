export interface DataResultado {
  ok: boolean;
  titulo: string;
  resultado: Resultado[];
}

export interface Resultado {
  dia: number;
  jerarquia: string;
  leyenda: string;
  importe: number;
}


export interface OtrasJurisdicciones {
  ok: boolean;
  titulo: string;
  resultado: OtrasJurisdiccionesResultado[];
}

export interface OtrasJurisdiccionesResultado {
  jerarquia: string;
  leyenda: string;
  importe: number;
}


export interface JurisdiccionMunicipal {
  ok: boolean;
  titulo: string;
  resultado: JurisdiccionMunicipalResultado[];
}

export interface JurisdiccionMunicipalResultado {
  jerarquia: string;
  leyenda: string;
  importe: number;
}

export interface IngresoMensualInterface {
  ok: boolean;
  titulo: string;
  resultado: IngresoMensualResultado[];
}

export interface IngresoMensualResultado {
  mes: number;
  jerarquia: string;
  leyenda: string;
  importe: number;
}
