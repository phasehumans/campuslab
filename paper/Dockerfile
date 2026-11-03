FROM alpine:latest

RUN apk add --no-cache \
    texlive \
    texlive-latexrecommended \
    texlive-latexextra \
    texlive-pictures \
    texlive-mathscience \
    texlive-binextra

WORKDIR /workdir

CMD ["sh", "-c", "pdflatex -interaction=nonstopmode main.tex && bibtex main && pdflatex -interaction=nonstopmode main.tex && pdflatex -interaction=nonstopmode main.tex"]
