import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
  addDoc,
  setDoc,
  arrayUnion,
} from 'firebase/firestore/lite';
import {
  getAuth,
  isSignInWithEmailLink,
  signInWithEmailLink,
  sendSignInLinkToEmail,
  onAuthStateChanged,
  signOut,
  User,
} from 'firebase/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { GameService } from './game.service';
import { PlayerService } from './player.service';
import data from '../../../firebase_config.json';
import { Player } from '../models/player';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private firebaseConfig;
  private app;
  private db;
  private auth;
  emailSent: Subject<Boolean> = new Subject<Boolean>();
  currentUser: Subject<User | null> = new Subject<User | null>();

  constructor(
    private gameService: GameService,
    private playerService: PlayerService,
    private router: Router
  ) {
    this.firebaseConfig = data;

    this.app = initializeApp(this.firebaseConfig);
    this.db = getFirestore(this.app);
    this.auth = getAuth();

    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.currentUser.next(user);
      } else {
        this.currentUser.next(null);
      }
    });
  }

  async sendEmailLink(email: string) {
    const actionCodeSettings = {
      url: 'https://' + data.projectId + '.web.app/login',
      handleCodeInApp: true,
    };

    try {
      await sendSignInLinkToEmail(this.auth, email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', email);
      this.emailSent.next(true);

      const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: 'success',
        title: 'Email sent!',
      });
    } catch (err) {
      console.error('Error sending email link: ', err);

      const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: 'error',
        title: "Couldn't send email!",
      });
    }
  }

  async confirmSignIn(url: string) {
    try {
      if (isSignInWithEmailLink(this.auth, url)) {
        let email = window.localStorage.getItem('emailForSignIn');

        // If missing email, prompt user for it
        if (!email) {
          email = window.prompt('Please provide your email for confirmation');
        }

        // Signin user and remove the email localStorage
        const result = await signInWithEmailLink(this.auth, email!, url);
        window.localStorage.removeItem('emailForSignIn');

        this.router.navigateByUrl('/');

        const Toast = Swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: 'success',
          title: 'Signed in!',
        });
      }
    } catch (err) {
      console.error('Error logging in: ', err);

      this.router.navigateByUrl('/');

      const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: 'error',
        title: "Couldn't log in!",
      });
    }
  }

  getCurrentUser() {
    return this.auth.currentUser;
  }

  async logout() {
    try {
      const logout = await signOut(this.auth);

      const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: 'success',
        title: 'Signed out!',
      });
    } catch (err) {
      console.error('Error logging out: ', err);

      const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: 'error',
        title: "Couldn't log out!",
      });
    }
  }

  async addResult() {
    let game = this.gameService.getGame();

    if (this.auth.currentUser) {
      game.uploadedBy = this.auth.currentUser?.uid;
    }

    const players = this.playerService.getPlayers();
    game.players = players;
    const result = game;

    try {
      const players = this.playerService.getPlayers();
      let playersArray: string[] = [];

      players.forEach((player) => {
        playersArray.push(player.name);
      });

      await setDoc(
        doc(this.db, 'players', 'playerList'),
        {
          players: arrayUnion(...playersArray),
        },
        { merge: true }
      );

      const docRef = await addDoc(collection(this.db, 'games'), result);
      this.gameService.setGameUploaded();
      console.log('Document written with ID: ', docRef.id);

      const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: 'success',
        title: 'Game uploaded!',
      });
    } catch (e) {
      console.error('Error adding document: ', e);

      const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: 'error',
        title: "Couldn't upload game!",
      });
    }
  }

  async getPlayersList() {
    if (this.auth.currentUser) {
      try {
        const playerListDoc = await getDoc(
          doc(this.db, 'players', 'playerList')
        );

        if (playerListDoc.exists()) {
          const playerList = playerListDoc.data();

          playerList['players'].forEach((name: string) => {
            this.playerService.addPlayer({
              name: name,
              selected: false,
            } as Player);
          });
        }
      } catch (e) {
        console.error('Error getting players list: ', e);
      }
    }
  }

  async getGames() {
    if (this.auth.currentUser) {
      try {
        const gamesList = await getDocs(query(collection(this.db, 'games'), orderBy('startTime')));
        let games: Game[] = [];

        gamesList.forEach((game) => {
          games.push(game.data());
        });

        return games;
      } catch (e) {
        console.error('Error getting games list: ', e);
      }
    }

    return [];
  }
}
