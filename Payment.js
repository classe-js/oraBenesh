class Payment{
    #primary_key;#datePay;#mount;#description;#status;#payment_method;#user;
    static id=0;
    constructor(datePay,mount,description,status,payment_method,user){
        this.#primary_key=id;
        id++;
        this.#datePay=datePay;
        this.#mount=mount;
        this.#description=description;
        this.#status=status;
        this.#payment_method=payment_method;
        this.setUserDetails(user);
    }
    //ביצוע תשלום
    pay(p){
        paymentsArr.push(p);
    }
     //ביצוע החזר
    refund(refund){
        refundsArr.push(refund);
    }
    //מזהה התשלום
    getPrimary_key(){
        return this.#primary_key;
    }
    getDatePay(){
        return this.#datePay;
    }
    getDescription(){
        return this.#description;
    }
    getStatus(){
        return this.#status;
    }
    getPayment_method(){
        return this.#primary_key;
    }
    getMount(){
        return this.#mount;
    }
    getPaymentUserId(){
        return this.#user.getUserId();
    }
    //עדכון
    setDatePay(d){
        this.#datePay=d;
    }
    setMount(m){
        this.#mount=m;
    }   
    setDescription(d){
        this.#description=d;
    }
    setStatus(s){
        this.#status=s;
    }
    setPaymentMetod(m){
        this.#payment_method=m;
    }
    setUserDetails(u){
        this.user.setName(u.#name)
        this.user.setId(u.#id)
        this.user.setPhone(u.#phone)
    }
}
class User{
    #name;#id;#phone;
    constructor(name,id,phone){
        this.#id=id;
        this.#name=name;
        this.#phone=phone;
    }
    setName(n){
    this.#name=n;
    }
    setId(i){
    this.#id=i;
    }
    setPhone(p){
    this.#phone=p;
    }
    getUserId()     {
    return this.#id;
    }
}
const PaymentMethod={
    CASH:'cash',
    VISA:'visa',
    CHEQUE: 'cheque',
    CLEARING:'clearing'
}
class Refund{
    #userId;#refunDate;#refundMount;
    constructor(userId,refunDate,refundMount){
        this.#refunDate=refunDate;
        this.#refundMount=refundMount;
        this.#userId=userId;
    }
}
class VisaRefund{
refund(){
 Payment.refund(r);
}

}
class ClearingRefund{
refund(r){
    Payment.refund(r);
}

}
class visaPayment extends Payment{
 #fourEndDigits;#threeBackDigits;#expirationDate;
 constructor(datePay,mount,description,status,payment_method,user,fourEndDigits,threeBackDigits,expirationDate){
        super(datePay,mount,description,status,payment_method,user);
        this.#expirationDate=expirationDate;
        this.#fourEndDigits=fourEndDigits;
        this.#threeBackDigits=threeBackDigits;
 }
 pay(){
    let a=new Date();
    let b=document.getElementById('mount').value;
    let c=document.getElementById('description').value;
    let d=true;
    let e=document.getElementById('payment_method').value;
    let f=document.getElementById('user.name').value;
    let g=document.getElementById('user.id').value;
    let h=document.getElementById('user.phone').value;
    let i=document.getElementById('fourEndDigits').value;
    let j=document.getElementById('threeBackDigits').value;
    let k=document.getElementById('expirationDate').value;
    let user=new User(f,g,h);
    let p=new visaPayment(a,b,c,d,e,user,i,j,k);
    Payment.pay(p);
 }
 refund(primary_key){
    let p=paymentsArr.find(payment=>payment.getPrimary_key()==primary_key);
    let refund =new VisaRefund(p.getPaymentUserId(),new Date(),p.getMount());
 }
}
class ClearingCompanyPayment extends Payment{
    #clearingId; 
    constructor(datePay,mount,description,status,payment_method,user,clearingId){
        super(datePay,mount,description,status,payment_method,user);
        this.#clearingId=clearingId;
 }
 pay(){
    let a=new Date();
    let b=document.getElementById('mount').value;
    let c=document.getElementById('description').value;
    let d=true;
    let e=document.getElementById('payment_method').value;
    let f=document.getElementById('user.name').value;
    let g=document.getElementById('user.id').value;
    let h=document.getElementById('user.phone').value;
    let i=document.getElementById('clearingId').value;
    let user=new User(f,g,h);
    let p=new ClearingCompanyPayment(a,b,c,d,e,user,i);
    Payment.pay(p);
 }
 refund(primary_key){
    let p=paymentsArr.find(payment=>payment.getPrimary_key()==primary_key);
    let refund =new ClearingRefund(p.getPaymentUserId(),new Date(),p.getMount());
 }
}

paymentsArr=[];
refundsArr=[];