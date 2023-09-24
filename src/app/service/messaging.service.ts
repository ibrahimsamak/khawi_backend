import { Injectable } from "@angular/core";
import { AngularFireMessaging } from "@angular/fire/messaging";
import { BehaviorSubject } from "rxjs";
import {
	LayoutUtilsService,
	MessageType,
} from "./../core/_base/crud/utils/layout-utils.service";

import {
	ToasterService,
	ToasterConfig,
	Toast,
	BodyOutputType,
} from "angular2-toaster";
import { ConstantService } from "./constant.service";

@Injectable()
export class MessagingService {
	currentMessage = new BehaviorSubject(null);
	constructor(
		private angularFireMessaging: AngularFireMessaging,
		private layoutUtilsService: LayoutUtilsService,
		private toasterService: ToasterService,
		private helper: ConstantService
	) {
		this.angularFireMessaging.messaging.subscribe((_messaging) => {
			_messaging.onMessage = _messaging.onMessage.bind(_messaging);
			_messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(
				_messaging
			);
		});
	}
	requestPermission(userId) {
		this.angularFireMessaging.requestToken.subscribe(
			(token) => {
				this.helper
					.refreshtoken({ _id: userId, fcmToken: token })
					.subscribe((x) => {
						console.log(x);
					});

				console.log(token);
			},
			(err) => {
				console.error("Unable to get permission to notify.", err);
			}
		);
	}

	playAudio() {
		let audio = new Audio();
		audio.src = "../../assets/audio/1.mp3";
		audio.load();
		audio.play();
	}

	receiveMessage() {
		this.angularFireMessaging.messages.subscribe((payload) => {
			console.log("new message received. ", payload);
			this.playAudio();
			this.currentMessage.next(payload);
		});
	}
	config = new ToasterConfig({
		positionClass: "toast-bottom-left",
		timeout: 100000,
		newestOnTop: true,
		tapToDismiss: true,
		preventDuplicates: false,
		animation: "fade",
		limit: 5,
	});

	showToast(type: string, title: string, body: string) {
		const toast: Toast = {
			type: type,
			title: title,
			body: body,
			timeout: 5000,
			showCloseButton: true,
			bodyOutputType: BodyOutputType.Default,
		};
		this.toasterService.popAsync(toast);
	}
}
