import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PreguntaEvaluacion, RespuestaEvaluacion } from '../../models/evaluacion.model';

@Component({
  selector: 'app-test-evaluacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './test-evaluacion.component.html',
  styleUrls: ['./test-evaluacion.component.css']
})
export class TestEvaluacionComponent implements OnInit, OnDestroy {
  pregunta: PreguntaEvaluacion = {
    id: '1',
    titulo: 'Test de Evaluación',
    subtitulo: 'Nivel de Madurez del Negocio',
    instrucciones: 'Responde a la siguiente pregunta de la forma que prefieras. Puedes escribir tu respuesta en el campo de texto o grabar un mensaje de voz de hasta 2 minutos. Tu respuesta será evaluada por uno de nuestros agentes para entender mejor tu proyecto.',
    pregunta: '¿Qué innovación tiene tu emprendimiento que lo diferencia de los demás? Explica su potencial de crecimiento y por qué quieres formar parte de esta incubadora.',
    tiempoLimiteGrabacion: 120 // 2 minutos
  };

  respuestaTexto: string = '';
  estaGrabando: boolean = false;
  tiempoGrabacion: number = 0;
  tiempoLimite: number = 120; // 2 minutos en segundos
  reconocimientoVoz: any = null;
  intervalo: any = null;
  respuestaEnviada: boolean = false;
  respuestaMostrar: string = '';

  constructor() {}

  ngOnInit(): void {
    this.inicializarReconocimientoVoz();
  }

  ngOnDestroy(): void {
    this.detenerGrabacion();
    if (this.intervalo) {
      clearInterval(this.intervalo);
    }
  }

  inicializarReconocimientoVoz(): void {
    // Verificar si el navegador soporta Web Speech API
    const SpeechRecognition = (window as any).SpeechRecognition || 
                              (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn('El navegador no soporta reconocimiento de voz');
      return;
    }

    this.reconocimientoVoz = new SpeechRecognition();
    this.reconocimientoVoz.continuous = true;
    this.reconocimientoVoz.interimResults = true;
    this.reconocimientoVoz.lang = 'es-ES';

    this.reconocimientoVoz.onresult = (event: any) => {
      let textoTranscrito = '';
      
      // Procesar todos los resultados desde el último índice procesado
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        const isFinal = event.results[i].isFinal;
        
        if (isFinal) {
          // Solo agregar resultados finales para evitar duplicados
          textoTranscrito += transcript + ' ';
        }
      }

      // Agregar el texto transcrito al textarea solo si hay contenido
      if (textoTranscrito.trim()) {
        this.respuestaTexto += textoTranscrito;
      }
    };

    this.reconocimientoVoz.onerror = (event: any) => {
      console.error('Error en reconocimiento de voz:', event.error);
      if (event.error === 'no-speech') {
        // No hacer nada, solo esperar más audio
      } else {
        this.detenerGrabacion();
        alert('Error al grabar. Por favor, intenta nuevamente.');
      }
    };

    this.reconocimientoVoz.onend = () => {
      // Si se detuvo automáticamente por el límite de tiempo, reiniciar
      if (this.estaGrabando && this.tiempoGrabacion < this.tiempoLimite) {
        try {
          this.reconocimientoVoz.start();
        } catch (e) {
          // Ya está iniciado o hay un error
        }
      }
    };
  }

  iniciarGrabacion(): void {
    if (!this.reconocimientoVoz) {
      alert('Tu navegador no soporta reconocimiento de voz. Por favor, escribe tu respuesta.');
      return;
    }

    if (this.estaGrabando) {
      this.detenerGrabacion();
      return;
    }

    try {
      this.estaGrabando = true;
      this.tiempoGrabacion = 0;
      this.reconocimientoVoz.start();

      // Iniciar contador de tiempo
      this.intervalo = setInterval(() => {
        this.tiempoGrabacion++;
        
        // Detener automáticamente al llegar al límite
        if (this.tiempoGrabacion >= this.tiempoLimite) {
          this.detenerGrabacion();
          alert('Tiempo máximo de grabación alcanzado (2 minutos)');
        }
      }, 1000);
    } catch (error) {
      console.error('Error al iniciar grabación:', error);
      this.estaGrabando = false;
      alert('No se pudo iniciar la grabación. Por favor, intenta nuevamente.');
    }
  }

  detenerGrabacion(): void {
    if (this.reconocimientoVoz && this.estaGrabando) {
      try {
        this.reconocimientoVoz.stop();
      } catch (e) {
        // Ignorar errores al detener
      }
    }

    this.estaGrabando = false;
    
    if (this.intervalo) {
      clearInterval(this.intervalo);
      this.intervalo = null;
    }
  }

  formatearTiempo(segundos: number): string {
    const mins = Math.floor(segundos / 60);
    const secs = segundos % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  puedeEnviar(): boolean {
    return this.respuestaTexto.trim().length > 0 && !this.estaGrabando;
  }

  enviarRespuesta(): void {
    if (!this.puedeEnviar()) {
      if (this.estaGrabando) {
        alert('Por favor, detén la grabación antes de enviar.');
      } else {
        alert('Por favor, escribe o graba una respuesta antes de enviar.');
      }
      return;
    }

    // Detener grabación si está activa
    if (this.estaGrabando) {
      this.detenerGrabacion();
    }

    const respuesta: RespuestaEvaluacion = {
      preguntaId: this.pregunta.id,
      respuestaTexto: this.respuestaTexto.trim(),
      duracionGrabacion: this.tiempoGrabacion > 0 ? this.tiempoGrabacion : undefined,
      fechaRespuesta: new Date(),
      metodoRespuesta: this.tiempoGrabacion > 0 
        ? (this.respuestaTexto.trim().length > 0 ? 'mixto' : 'voz')
        : 'texto'
    };

    // Mostrar la respuesta
    this.respuestaMostrar = respuesta.respuestaTexto;
    this.respuestaEnviada = true;

    console.log('Respuesta enviada:', respuesta);
    
    // Aquí puedes agregar la lógica para enviar al backend
    // this.evaluacionService.enviarRespuesta(respuesta).subscribe(...)
  }

  reiniciar(): void {
    this.respuestaTexto = '';
    this.respuestaEnviada = false;
    this.respuestaMostrar = '';
    this.tiempoGrabacion = 0;
    this.detenerGrabacion();
  }
}

