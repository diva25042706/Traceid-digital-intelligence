import math
import re
from typing import List, Dict, Any, Optional, Tuple

class VectorStore:
    """
    Lightweight, dependency-free semantic vector store using n-gram TF-IDF and cosine similarity.
    Indexes candidate profiles, bios, repository descriptions, and source documents for semantic ranking.
    """

    def __init__(self):
        self.documents: Dict[str, Dict[str, Any]] = {}
        self.doc_term_freqs: Dict[str, Dict[str, float]] = {}
        self.doc_lengths: Dict[str, float] = {}
        self.idf: Dict[str, float] = {}
        self.vocabulary: set = set()

    def _tokenize(self, text: str) -> List[str]:
        if not text:
            return []
        cleaned = re.sub(r"[^\w\s]", " ", text.lower())
        tokens = [t for t in cleaned.split() if len(t) > 1]
        
        # Add bigrams for names & org terms (e.g., 'hareesh rajendiran', 'vanakkam dsa')
        bigrams = [f"{tokens[i]}_{tokens[i+1]}" for i in range(len(tokens) - 1)]
        return tokens + bigrams

    def _recompute_idf(self):
        n_docs = len(self.documents)
        if n_docs == 0:
            self.idf = {}
            return

        doc_count_per_term: Dict[str, int] = {}
        for doc_id, tf_map in self.doc_term_freqs.items():
            for term in tf_map.keys():
                doc_count_per_term[term] = doc_count_per_term.get(term, 0) + 1

        self.idf = {}
        for term, count in doc_count_per_term.items():
            # Smooth IDF
            self.idf[term] = math.log((n_docs + 1.0) / (count + 1.0)) + 1.0

        # Recompute doc vector lengths with IDF
        self.doc_lengths = {}
        for doc_id, tf_map in self.doc_term_freqs.items():
            sum_sq = 0.0
            for term, tf in tf_map.items():
                w = tf * self.idf.get(term, 1.0)
                sum_sq += w * w
            self.doc_lengths[doc_id] = math.sqrt(sum_sq) if sum_sq > 0 else 1.0

    def add_document(self, doc_id: str, text: str, metadata: Optional[Dict[str, Any]] = None):
        tokens = self._tokenize(text)
        tf: Dict[str, float] = {}
        for t in tokens:
            tf[t] = tf.get(t, 0.0) + 1.0

        # Sublinear TF scaling
        for t in tf:
            tf[t] = 1.0 + math.log(tf[t])

        self.documents[doc_id] = {
            "id": doc_id,
            "text": text,
            "metadata": metadata or {}
        }
        self.doc_term_freqs[doc_id] = tf
        for t in tf:
            self.vocabulary.add(t)

        self._recompute_idf()

    def add_documents(self, docs: List[Dict[str, Any]]):
        for doc in docs:
            self.add_document(
                doc_id=doc.get("id", str(len(self.documents))),
                text=doc.get("text", "") or doc.get("content", ""),
                metadata=doc.get("metadata", doc)
            )

    def search(self, query: str, top_k: int = 5, min_score: float = 0.0) -> List[Dict[str, Any]]:
        query_tokens = self._tokenize(query)
        if not query_tokens or not self.documents:
            return []

        # Compute query TF-IDF vector
        q_tf: Dict[str, float] = {}
        for t in query_tokens:
            q_tf[t] = q_tf.get(t, 0.0) + 1.0
        for t in q_tf:
            q_tf[t] = 1.0 + math.log(q_tf[t])

        q_sum_sq = 0.0
        q_weights: Dict[str, float] = {}
        for t, tf in q_tf.items():
            if t in self.idf:
                w = tf * self.idf[t]
                q_weights[t] = w
                q_sum_sq += w * w

        q_len = math.sqrt(q_sum_sq) if q_sum_sq > 0 else 1.0

        results: List[Tuple[str, float]] = []
        for doc_id, d_tf in self.doc_term_freqs.items():
            dot_product = 0.0
            for t, qw in q_weights.items():
                if t in d_tf:
                    dw = d_tf[t] * self.idf.get(t, 1.0)
                    dot_product += qw * dw

            d_len = self.doc_lengths.get(doc_id, 1.0)
            score = dot_product / (q_len * d_len) if (q_len * d_len) > 0 else 0.0

            if score >= min_score:
                results.append((doc_id, score))

        results.sort(key=lambda x: x[1], reverse=True)

        output = []
        for doc_id, score in results[:top_k]:
            doc_data = self.documents[doc_id]
            output.append({
                "id": doc_id,
                "score": round(score, 4),
                "text": doc_data["text"],
                "metadata": doc_data["metadata"]
            })
        return output

    def clear(self):
        self.documents.clear()
        self.doc_term_freqs.clear()
        self.doc_lengths.clear()
        self.idf.clear()
        self.vocabulary.clear()

vector_store = VectorStore()