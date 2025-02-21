import { Injectable } from "@nestjs/common";
import { RmqContext } from "@nestjs/microservices";

@Injectable()
export class RmqConsumerService {
  async defaultNest(data: any, context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
  
    try {
      console.log('Processando pedido:', data);
      // Simula um processamento bem-sucedido
  
      // ✅ Confirma que a mensagem foi processada com sucesso
      channel.ack(originalMsg);
    } catch (error) {
      console.error('Erro ao processar pedido:', error);
  
      // ❌ Opcional: Rejeita a mensagem para que possa ser reenviada
      channel.nack(originalMsg, false, false);
    }
  }
}