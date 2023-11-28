import http from "@/http-common";

/* eslint-disable */
class EmotakuService {
  
  createMessage(message:any): Promise<any> {
    return http.post('/createMessage', message);
  }

  getAllMessage(): Promise<any> {
    return http.get("/messages");
  }
  
  getlastMessage(): Promise<any> {
    return http.get("/lastMessage");
  }

  getAllmusic(): Promise<any> {
    return http.get("/musicEmotaku");
  }
  
  get(id: any): Promise<any> {
    return http.get(`/tutorials/${id}`);
  }

  create(data: any): Promise<any> {
    return http.post("/tutorials", data);
  }

  update(id: any, data: any): Promise<any> {
    return http.put(`/tutorials/${id}`, data);
  }

  delete(id: any): Promise<any> {
    return http.delete(`/tutorials/${id}`);
  }

  deleteAll(): Promise<any> {
    return http.delete(`/tutorials`);
  }

  findByTitle(title: string): Promise<any> {
    return http.get(`/tutorials?title=${title}`);
  }



  /* ------------------ ENTRIES ------------------ */
  createEntry(entry:any): Promise<any> {
    return http.post('/createEntry', entry);
  }

  getAllEntries(): Promise<any> {
    return http.get("/entries");
  }
}

export default new EmotakuService();
