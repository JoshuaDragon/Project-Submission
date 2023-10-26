const FREE_WARNING = "Free shipping only applies to single customer orders"
const BANNED_WARNIN = 'Unfortunately we do not ship to your country of residence'
const NONE_SELECTED = 0

let customers = 1;
let location = 'RSA';
let currency = "R";

let shipping = null

if (location === 'RSA') {  
    shipping = 400;
    currency = 'R';
} if (location === 'NAM') {              
    shipping = 600; currency = '$'
} else {
    shipping = 800;
}

shoes = 300 * 1;
toys - 100 * 5;
shirts = 150 * NONE_SELECTED;
batteries = 35 * 2;
pens = 5 * NONE_SELECTED;

Total=(shoes + batteries + pens + shirts + toys)

if ( Total > 1000) {
	if ((location === 'NAM' || location === 'RSA') && customers < 2) {
			if (location === RSA)
		    shipping = 0
		}
	}

if (shipping === 0 && customers !== 1) 
	{ console.log(FREE_WARNING) }
if (location === 'NK') {
console.log(BANNED_WARNIN);
} else {
console.log('price', currency, Total);
}
