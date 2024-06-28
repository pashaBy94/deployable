import "@stdlib/deploy";

message ChangeOwner {
    newOwner: Address;
}

message Add {
    queryId: Int as uint64;
    amount: Int as uint32;
}

trait Ownable {
    owner: Address;
    fun requireOwner(){
        nativeThrowUnless(123, sender() == self.owner);
    }
    get fun owner(): Address{
        return self.owner;
    }
}
trait OwnableTransferable with Ownable {
    owner: Address;
    receive(msg: ChangeOwner){
        self.requireOwner();
        self.owner = msg.newOwner;
        self.reply("It`s good!".asComment());
    }
}

contract OwnerCounter with Deployable, OwnableTransferable {
    owner: Address;
    id: Int as uint32;
    counter: Int as uint32;

    init(id: Int) {
        self.owner = sender();
        self.id = id;
        self.counter = 0;
    }
    receive(msg: Add) {
        self.requireOwner();
        self.counter += msg.amount;
        self.notify("Cashback".asComment());
    }

    get fun counter(): Int {
        return self.counter;
    }

    get fun id(): Int {
        return self.id;
    }
    get fun addressSender():Address{
        return sender();
    }
    get fun addressOwner():Address{
        return self.owner;
    }
}
