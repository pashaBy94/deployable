import "@stdlib/deploy";
import "@stdlib/ownable";

message Add {
    queryId: Int as uint64;
    amount: Int as uint32;
}

trait Stopable with Ownable {
    owner: Address;
    stopped: Bool;
    fun requireNotStopped() {
        require(!self.stopped, "Contract stopped");
    }
 
    fun requireStopped() {
        require(self.stopped, "Contract not stopped");
    }
    receive("Stop"){
        self.requireOwner();
        self.stopped = true;
        self.reply("Stopped".asComment());
    }
    get fun stopped(): Bool{
        return self.stopped;
    }
}


trait Resumable with Stopable {
    stopped: Bool;
    owner: Address;
 
    receive("Resume") {
        self.requireOwner();
        self.requireStopped();
        self.stopped = false;
        self.reply("Resumed".asComment());
    }
}

contract StopableContract with Deployable, Resumable {
    stopped: Bool;
    owner: Address;
    counter: Int as uint32;
    init() {
        self.stopped = false;
        self.owner = sender();
        self.counter = 0;

    }
        receive(msg: Add) {
        self.requireOwner();
        self.requireNotStopped();
        self.counter += msg.amount;
        self.notify("Cashback".asComment());
    }

    get fun counter(): Int {
        return self.counter;
    }
}
