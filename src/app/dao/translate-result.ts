//Structure of the tranlsation api answer
export interface TranslateResult {
    head: Head;
    def:  Def[];
}

export interface Def {
    text: string;
    pos:  string;
    tr:   Tr[];
}

export interface Tr {
    text: string;
    pos:  string;
    syn:  Mean[];
    mean: Mean[];
    ex:   Ex[];
}

export interface Ex {
    text: string;
    tr:   Mean[];
}

export interface Mean {
    text: string;
}

export interface Head {
}
