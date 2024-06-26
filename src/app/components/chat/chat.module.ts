import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ChatRoutingModule } from "./chat-routing.module";
import { ChatComponent } from "./chat/chat.component";
import { AngularFireDatabaseModule } from "@angular/fire/database";

@NgModule({
  declarations: [ChatComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChatRoutingModule,
    AngularFireDatabaseModule,
  ],
})
export class ChatModule {}
