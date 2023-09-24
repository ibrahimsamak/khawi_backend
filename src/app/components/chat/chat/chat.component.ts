import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ChatUsers } from "../../../shared/model/chat.model";
import { ChatService } from "../../../shared/services/chat.service";
import { AngularFireDatabase } from "@angular/fire/database";
import { ToastrService } from "ngx-toastr";
import { ConstantServiceWrapper } from "src/app/service/ConstantServiceWrapper.service";
import { Router } from "@angular/router";
import { appConstant } from "src/app/service/appConstant";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"],
})
export class ChatComponent implements OnInit {
  @ViewChild("scrollMe") private myScrollContainer: ElementRef;

  public openTab: string = "call";
  public users: ChatUsers[] = [];
  public searchUsers: ChatUsers[] = [];
  public chatUser: any;
  public profile: any;
  public chats: any;
  public chatText: string;
  public error: boolean = false;
  public notFound: boolean = false;
  public id: any;
  public searchText: string;
  messages = [];
  conversation = [];
  myId;
  myImage;
  myName;
  userDetails;
  converation_id;
  constructor(
    private chatService: ChatService,
    private angularFireDB: AngularFireDatabase,
    private helper: ConstantServiceWrapper,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.chatService.getUsers().subscribe((users) => {
      this.searchUsers = users;
      this.users = users;
    });
    this.myId = localStorage.getItem("admin_id");
    this.myImage = localStorage.getItem("image");
    this.myName = localStorage.getItem("admin_username");
  }

  ngOnInit() {
    // this.userChat(this.id);
    // this.getProfile();
    // this.fetchMessages();
    this.fetchConversation();
  }

  getUserProfile(user_id) {
    this.helper.getSingleUser(user_id).subscribe((x) => {
      if (x[appConstant.STATUS]) {
        let object = x[appConstant.ITEMS] as any;
        this.userDetails = object;
      } else this.toastr.error(x[appConstant.MESSAGE]);
    });
  }

  public tabbed(val) {
    this.openTab = val;
  }

  // Get user Profile
  public getProfile() {
    this.chatService
      .getCurrentUser()
      .subscribe((userProfile) => (this.profile = userProfile));
  }

  // User Chat
  public userChat(obj) {
    this.converation_id = obj.udid;
    this.fetchMessages(this.converation_id);
    if (obj.sender_id == this.myId) {
      this.getUserProfile(obj.recipient_id);
    } else {
      this.getUserProfile(obj.sender_id);
    }
  }

  async fetchConversation() {
    this.messages = [];
    this.angularFireDB
      .list("Conversations")
      .snapshotChanges()
      .subscribe((res) => {
        this.conversation = [];
        res.forEach((doc) => {
          let obj = doc.payload.val();
          if (obj["udid"] && obj["udid"].includes(this.myId))
            this.conversation.push(doc.payload.val());
        });
        // if (this.conversation.length > 0) {
        //   this.fetchMessages(this.conversation[0].udid);
        //   this.converation_id = this.conversation[0].udid;

        //   if (this.conversation[0].sender_id == this.myId)
        //     this.getUserProfile(this.conversation[0].recipient_id);
        //   else this.getUserProfile(this.conversation[0].sender_id);
        // }
      });
    // setTimeout(() => {
    // this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    // }, 1500);
  }

  async fetchMessages(_conversation_id) {
    this.messages = [];
    let conversation_id = _conversation_id;
    this.angularFireDB
      .list("Messages/" + conversation_id)
      .snapshotChanges()
      .subscribe((res) => {
        let nodes = res.map((action) => ({ key: action.payload.val() }));
        this.messages = nodes;
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      });
    setTimeout(() => {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    }, 1000);
  }

  async sendMessage(txt) {
    if (txt && txt.value.trim() != "") {
      let conversation_id = this.converation_id;

      var unixtimestamp = new Date().getTime();
      let obj = {
        device_type: "web",
        dt_create_at: Number.parseInt(unixtimestamp.toString()),
        message: txt.value,
        recipient_id: this.userDetails._id,
        sender_id: this.myId,
        type: 1,
        udid: " ",
      };

      let key = this.angularFireDB.database
        .ref("Messages/" + conversation_id)
        .push(obj).key;

      this.angularFireDB.database
        .ref("Messages/" + conversation_id + `/${key}`)
        .update({ udid: key });

      this.angularFireDB.database
        .ref("Conversations/" + conversation_id)
        .update({
          last_message: txt.value,
          sender_id: this.myId,
          sender_image: this.myImage,
          sender_name: this.myName,
          recipient_id: this.userDetails._id,
          recipient_image: this.userDetails.image,
          recipient_name:
            this.userDetails.full_name != ""
              ? this.userDetails.full_name
              : this.userDetails.phone_number,
        });

      txt.value = "";
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    }
  }
}
