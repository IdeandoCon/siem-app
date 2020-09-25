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


export interface ImportePorDia {
  ok: boolean;
  titulo: string;
  resultado:ImportePorDiaResultado[];
}

export interface ImportePorDiaResultado {
  dia: number;
  jerarquia: string;
  leyenda: string;
  importe: number;
}


export interface Login {
  ok: boolean;
  usuario: Usuario;
  token: string;
  id: string;
}

export interface Usuario {
  role: string;
  google: string;
  _id: string;
  nombre: string;
  email: string;
  password: string;
  municipalidad: string;
  __v: number;
}