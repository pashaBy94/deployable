message Deploy {
    queryId: Int as uint64;
}
message DeployOk {
    queryId: Int as uint64;
}
trait Deployable {
    receive(msg: Deploy){
        self.reply(DeployOk{queryId: msg.queryId}.toCell());
    }
}

contract DeployableContract with Deployable{
    init() {    }
    receive("Hello"){
        self.reply("Hello frend".asComment());

    }
}
