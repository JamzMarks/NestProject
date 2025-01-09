import * as fs from "fs/promises"; // Use a versão Promises para simplificar o código.


const messagesJSON = 'messages.json'

export class MessagesRepository {
    async findOne(id: string): Promise<any>{
        try {
            const content = await fs.readFile(messagesJSON, 'utf-8');
            const messages = JSON.parse(content)

            if(messages[id] === null){
                throw new Error('Mensagem nao encontrada');
            }else{
                return messages[id] 
            }

        } catch (err) {
            throw new Error(`Erro ao buscar mensagem: ${err.message}`);
        }
    }

    async findAll(){
        try {
            const content = await fs.readFile(messagesJSON, 'utf-8');
            const messages = JSON.parse(content);

            return messages;
        } catch (err) {
            throw new Error(`Erro ao buscar mensagens: ${err.message}`);
        }
    }

    async createMessage(content: string){
        try {
            const contents = await fs.readFile(messagesJSON, 'utf-8');

            const messages = JSON.parse(contents);

            const id = Math.floor(Math.random() * 999)
            messages[id] = {id, content}

            await fs.writeFile(messagesJSON, JSON.stringify(messages))
        } catch (err) {
            throw new Error(`Erro ao buscar mensagens: ${err.message}`);
        }
        
    }
}