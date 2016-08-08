"use strict";

const fs = require('fs');
const readline = require('readline');

class DnaAnalyzer {
  constructor() {
    this.nucleotides = {'A': 0, 'T': 0, 'G': 0, 'C': 0, 'U': 0};
    this.codonTable = {
      'UUU': 'F', 'AUU': 'I', 'GUG': 'V',
      'UUC': 'F', 'AUC': 'I', 'GUC': 'V',
      'UUA': 'L', 'AUA': 'I', 'UCG': 'S',
      'UUG': 'L', 'AUG': 'M', 'UCA': 'S',
      'GUU': 'V', 'GUA': 'V', 'UCU': 'S',
      'UCC': 'S', 'AGU': 'S', 'AGC': 'S',
      'CCU': 'P', 'CCG': 'P', 'CCC': 'P',
      'CCA': 'P', 'ACU': 'T', 'ACG': 'T',
      'ACC': 'T', 'ACA': 'T', 'GCU': 'A',
      'GCC': 'A', 'GCA': 'A', 'GCG': 'A',
      'UAU': 'Y', 'UAC': 'Y', 'CAU': 'H',
      'CAC': 'H', 'CAA': 'Q', 'CAG': 'Q',
      'AAU': 'N', 'AAC': 'N', 'AAA': 'K',
      'AAG': 'K', 'GAU': 'D', 'GAC': 'D',
      'GAG': 'E', 'GAA': 'E', 'UGU': 'C',
      'UGC': 'C', 'UGG': 'W', 'CGA': 'R',
      'CGU': 'R', 'CGG': 'R', 'CGC': 'R',
      'AGA': 'R', 'AGG': 'R', 'GGU': 'G',
      'GGA': 'G', 'GGG': 'G', 'GGC': 'G',
      'UGA': '-', 'UAA': '-', 'UAG': '-'
    };

    this.codon = {};
    this.aa = {};

    //populate the codon and amino acid objects
    for (let triplet in this.codonTable) {
      this.codon[triplet] = 0;
      this.aa[this.codonTable[triplet]] = 0;
    }

    this.header = '';
    this.sequence = '';
    this.transcript = '';

    this.adenineCount = 0;
    this.thymineCount = 0;
    this.guanineCount = 0;
    this.cytosineCount = 0;
    this.gcContent = 0;
    this.totalBases = 0;
    this.MB = 0;
    this.totalAa = 0;
  }

  parseFASTA(dnaString, callback) {
    let offset = 0;
    for (let idx = 0; idx < dnaString.length; idx++) {
      if (dnaString[0] === '>') {
        if (dnaString[idx] !== '\n') {
          this.header += dnaString[idx];
          offset += 1;
        } else { break; }
      }
    }

    for (let idx = offset+1; idx < dnaString.length; idx++){
      this.sequence += dnaString[idx];
    }

    if (callback) {
      callback();
    }
  }

  //reads fasta, calls parseFASTA, calls AnalyzeSequence
  readFASTA(pathToFile, fileName, callback) {
    const lineReader = readline.createInterface({
      input: fs.createReadStream(__dirname + '/' + pathToFile + fileName) // relative path
    });

    lineReader.on('line', (line) => {
      if (line[0] === '>') {
        this.header += line;
      } else {
        this.sequence += line;
      }
    })

    //when finished reading file, now we can parse input
    lineReader.on('close', () => {
      console.log('done reading file\n');
      this.analyzeFASTA(this.sequence);
      //this.dnaReport()
      if (callback) {
        callback();
      }
    }.bind(this)); // switch context from interface to DnaAnalyzer
  }

  analyzeFASTA(sequence) {
    let seq = sequence.toUpperCase(); //just to be safe & consistent

    /* Nucleotide count */
    for (let idx = 0; idx < seq.length; idx++) {
      if (this.nucleotides.hasOwnProperty(seq[idx])) {
        this.nucleotides[seq[idx]] += 1;
      }
    }

    /* Transcribe DNA to RNA */
    this.transcript = seq.replace(/T/gi, 'U');

    /* Get codon usage & amino acid composition */
    for (let idx = 0; idx < seq.length; idx += 3) {
      if (this.codon.hasOwnProperty(seq.substr(idx, 3))) {
        this.codon[seq.substr(idx, 3)] += 1;
        this.aa[this.codonTable[seq.substr(idx, 3)]] += 1;
      }
    }

    /* Get GC content, megabases and Total Bases */
    // encapsulate regex match so it is evaluated first, then can use length method
    this.adenineCount = this.nucleotides['A'];
    this.thymineCount = this.nucleotides['T'];
    this.cytosineCount = this.nucleotides['C'];
    this.guanineCount = this.nucleotides['G'];

    this.totalBases = this.guanineCount + this.cytosineCount + this.thymineCount + this.adenineCount;
    this.MB = this.totalBases / 1000000.0;

    this.gcContent = (((this.guanineCount + this.cytosineCount) / (this.totalBases)) * 100).toFixed(2);


    /* Get total amino acid count */
    let aaCount = 0;
    for (let aa in this.aa) {
      aaCount += this.aa[aa];
    }
    this.totalAa = aaCount;
  }

  // Won't be used, just to prettify things / testing
  dnaReport() {
    /* General Info */
    console.log(this.header);
    console.log('\n' + 'Total bases: ' + this.totalBases);
    console.log('Mega Bases: ' + this.MB.toFixed(6));
    console.log('GC content: ' + this.gcContent + '\n');

    /* Base information */
    for (let base in this.nucleotides) {
      console.log(`${base} : ${(this.nucleotides[base] / this.totalBases * 100).toFixed(2)}%  ${this.nucleotides[base]}`);
    }

    /* amino acid composition */
    console.log('\nAmino Acid Composition:\n----------------')
    for (let aa in this.aa) {
      console.log(`${aa} : ${(this.aa[aa] / this.totalAa * 100).toFixed(2)}%  ${this.aa[aa]}`);
    }

    /* codon usage */
    console.log('\nCodon Usage:\n-----------------')
    for (let codon in this.codon) {
      console.log(`${codon} : ${this.codonTable[codon]}  ${(this.codon[codon] / this.totalAa * 100).toFixed(2)}%  ${this.codon[codon]}`);
    }
  }
}

// let d = new DnaAnalyzer();
// d.readFASTA('../uploadedFiles/', 'sequence.fasta');
module.exports.DnaAnalyzer = DnaAnalyzer;
