export const nucleotideData = {
  labels: ['Adenine', 'Thymine', 'Guanine', 'Cytosine'],
  datasets: [
    {
      label: 'Nucleotide',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
      hoverBorderColor: 'rgba(255, 99, 132, 1)',
      data: [results.adenineCount, results.thymineCount, results.guanineCount, results.cytosineCount]
    }
  ]
};

export const gcContentData = {
	labels: [
		'GC Content',
		'AT Content',
	],
	datasets: [{
		data: [results.gcContent, 100-results.gcContent],
		backgroundColor: [
		'rgba(255, 99, 132, 0.4)',
		'rgba(84, 110, 122, 0.4)',
		],
		hoverBackgroundColor: [
		'rgba(255, 99, 132, 1)',
		'rgba(84, 110, 122, 1)',
		]
	}]
};

export function getAaData(aaLabel, aaAmount) {
  for (let aa in results.aa) {
    aaLabel.push(aa);
    aaAmount.push(results.aa[aa]);
  }
}

export function makeAaData(aaLabel, aaAmount) {
  return {
    labels: aaLabel,
    datasets: [
      {
        label: 'Amino acid',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: aaAmount
      }
    ]
  }
};

export function getCodonData(codonLabel, codonAmount) {
  for (let codon in results.codon) {
    codonLabel.push(codon);
    codonAmount.push(results.codon[codon]);
  }
}

export function makeCodonData(codonLabel, codonAmount) {
  return {
    labels: codonLabel,
    datasets: [
      {
        label: 'Codon',
        backgroundColor: 'rgba(84, 110, 122, 0.2)',
        borderColor: 'rgba(84, 110, 122, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(84, 110, 122, 0.4)',
        hoverBorderColor: 'rgba(84, 110, 122, 1)',
        data: codonAmount
      }
    ]
  }
};

export const options = {
    scales: {
        yAxes: [{
            display: true,
            ticks: {
                beginAtZero: true
            }
        }]
      }
}
