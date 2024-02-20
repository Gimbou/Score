import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
} from 'firebase/firestore/lite';
import Swal from 'sweetalert2';

import { GameService } from './game.service';
import { PlayerService } from './player.service';
import data from '../../../firebase_config.json';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private firebaseConfig;
  private app;
  private db;

  constructor(private gameService: GameService, private playerService: PlayerService) {
    this.firebaseConfig = data;

    this.app = initializeApp(this.firebaseConfig);
    this.db = getFirestore(this.app);
  }

  async addResult() {
    let game = this.gameService.getGame();
    const players = this.playerService.getPlayers();
    game.players = players;
    const result = game;

    try {
      const docRef = await addDoc(collection(this.db, 'games'), result);
      this.gameService.setGameUploaded();
      console.log('Document written with ID: ', docRef.id);

      const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Game uploaded!"
      });
    } catch (e) {
      console.error('Error adding document: ', e);
      
      const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "error",
        title: "Couldn't upload game!"
      });
    }
  }
}
