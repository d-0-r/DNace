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
  }

  //reads fasta, calls parseFASTA, calls AnalyzeSequence
  readFASTA(pathToFile, fileName) {
    const lineReader = readline.createInterface({
      input: fs.createReadStream(__dirname + '/' + pathToFile + fileName) // relative path
    });

    lineReader.on('line', (line) => {
      if (line[0] == '>') {
        this.header += line;
      } else {
        this.sequence += line;
      }
    })

    //when finished reading file, now we can parse input
    lineReader.on('close', () => {
      console.log('done reading file');
      this.analyzeFASTA(this.sequence);
      // console.log(this.transcript)
      // console.log(this.nucleotides)
      // console.log(this.codon)
      // console.log(this.aa)
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
    this.transcript = seq.replace(/T/gi, "U");

    /* Get codon usage & amino acid composition */
    for (let idx = 0; idx < seq.length; idx += 3) {
      if (this.codon.hasOwnProperty(seq.substr(idx, 3))) {
        this.codon[seq.substr(idx, 3)] += 1;
        this.aa[this.codonTable[seq.substr(idx, 3)]] += 1;
      }
    }


  }
}

let d = new DnaAnalyzer();
d.readFASTA('../uploadedFiles/', 'sequence.fasta');
d.analyzeFASTA(d.sequence);
module.exports.DnaAnalyzer = DnaAnalyzer;
