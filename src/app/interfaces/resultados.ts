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