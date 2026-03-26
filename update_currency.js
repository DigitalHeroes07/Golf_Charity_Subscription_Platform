const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

const replacements = [
  { file: 'app/subscribe/page.tsx', replaces: [['£15', '₹1,499'], ['£150', '₹14,999']] },
  { file: 'app/api/checkout/route.ts', replaces: [['gbp', 'inr'], ['1500 :', '149900 :'], ['15000', '1499900']] },
  { file: 'app/dashboard/charity/page.tsx', replaces: [['£15.00', '₹1,499'], ['subFee] = useState(15.00)', 'subFee] = useState(1499.00)'], ['£${', '₹${']] },
  { file: 'app/dashboard/page.tsx', replaces: [['£12,450', '₹12,45,000'], ['£150.00', '₹15,000'], ['totalWinnings: 150.00', 'totalWinnings: 15000.00'], ['£${', '₹${']] },
  { file: 'app/dashboard/winnings/page.tsx', replaces: [['£12,450', '₹12,45,000'], ['amount: 150.00', 'amount: 15000.00'], ['amount: 25.00', 'amount: 2500.00'], ['£${', '₹${']] },
  { file: 'app/admin/winners/page.tsx', replaces: [['amount: 1458.33', 'amount: 145833.00'], ['amount: 74.40', 'amount: 7440.00'], ['£${', '₹${']] },
  { file: 'components/landing/LandingHero.tsx', replaces: [['£50k+', '₹50L+'], ['£100k+', '₹1Cr+'], ['£12,500', '₹12,50,000']] },
  { file: 'app/admin/page.tsx', replaces: [['125000', '12500000'], ['154000', '15400000'], ['£${', '₹${']] },
  { file: 'app/admin/draws/page.tsx', replaces: [
    ['totalPool: 12500', 'totalPool: 1250000'],
    ['totalPrize: 5000', 'totalPrize: 500000'],
    ['totalPrize: 4375', 'totalPrize: 437500'],
    ['eachPrize: 1458.33', 'eachPrize: 145833.00'],
    ['totalPrize: 3125', 'totalPrize: 312500'],
    ['eachPrize: 74.40', 'eachPrize: 7440.00'],
    ['newRollover: 5000', 'newRollover: 500000'],
    ['£${', '₹${']
  ]}
];

replacements.forEach(({ file, replaces }) => {
  const filePath = path.join(directoryPath, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    replaces.forEach(([from, to]) => {
      content = content.split(from).join(to);
    });
    // Global replace for any remaining '£' to '₹'
    content = content.split('£').join('₹');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
