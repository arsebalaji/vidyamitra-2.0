import re
from fractions import Fraction
def equivalent(answer:str,expected:str)->bool:
    if not re.fullmatch(r'[+-]?\d{1,9}(?:/[+-]?\d{1,9})?',answer.strip()):return False
    try:return Fraction(answer)==Fraction(expected)
    except (ValueError,ZeroDivisionError):return False
