import "@stdlib/deploy";
import "@stdlib/ownable";


message Add {
    queryId: Int as uint64;
    amount: Int as uint32;
}

trait Custom with Ownable{
    owner: Address;
    long: Int;
    virtual const IS_ALLOV: Bool = true;

    fun setLong(){
        if(self.filterLong()){
            self.long = self.long + 1;
        }
    }
    get fun long(): Int{
        return self.long;
    }
    receive("reset"){
        if(self.IS_ALLOV){
            self.requireOwner();
            self.long = 0;
            self.reply("reset done".asComment());
        }
    }
    virtual fun filterLong(): Bool{
        if(sender() == self.owner){
            return false;
        } 
            return true;
        
    }
}

contract CustomContract with Deployable, Custom {
    id: Int as uint32;
    counter: Int as uint32;
    long: Int;  
    owner: Address;
    override const IS_ALLOV: Bool = false;
    init(id: Int) {
        self.id = id;
        self.owner = sender();
        self.counter = 0;
        self.long = 0;
    }

    receive(msg: Add) {
        self.counter += msg.amount;
        self.setLong();
        self.notify("Cashback".asComment());
    }

    get fun counter(): Int {
        return self.counter;
    }

    get fun id(): Int {
        return self.id;
    }
    override fun filterLong(): Bool{
        return true;
    }
}
