module.exports = function toReadable(number) {
    if (number < 0) return 'minus ' + toReadable(-number);
    if (number === 0) return 'zero';

    const below20 = [
        'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
        'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 
        'seventeen', 'eighteen', 'nineteen'
    ];
    
    const tens = [
        '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
    ];
    
    const above1000 = [
        '', 'thousand', 'million', 'billion'
    ];
    
    let words = '';
    let i = 0;

    while (number > 0) {
        const chunk = number % 1000;
        
        if (chunk) {
            const str = convertChunk(chunk);
            words = str + (above1000[i] ? ' ' + above1000[i] : '') + ' ' + words;
        }
        
        number = Math.floor(number / 1000);
        i++;
    }

    return words.trim();

    function convertChunk(chunk) {
        let str = '';
        if (chunk >= 100) {
            str += below20[Math.floor(chunk / 100)] + ' hundred';
            chunk %= 100;
        }
        if (chunk < 20) {
            if (chunk > 0) {
                str += (str ? ' ' : '') + below20[chunk];
            }
        } else {
            str += (str ? ' ' : '') + tens[Math.floor(chunk / 10)] + (chunk % 10 ? ' ' + below20[chunk % 10] : '');
        }
        
        return str.trim();
    }
}
