from django.forms import ModelForm
from django import forms
from django.contrib.auth.models import User
from face.models import Profile

class UserForm(ModelForm):
    class Meta:
        model = User
        fields = ['username', 'password']
    
    def __init__(self, *args, **kwargs):
        # first call the 'real' __init__()
        super(UserForm, self).__init__(*args, **kwargs)
        # then do extra stuff:
        self.fields['username'].help_text = ''
        self.fields['username'].widget = forms.TextInput(attrs={'placeholder': '', 'style': 'font-size: 20', 'class': 'w3-input w3-border'})
        self.fields['password'].widget = forms.PasswordInput(attrs={'placeholder': '', 'style': 'font-size: 20', 'class': 'w3-input w3-border'})
        # self.fields['password'].widget.attrs['class'] = 'form-control'       

class SignUpForm(ModelForm):
    class Meta:
        model = Profile
        exclude = ['learner']
    
class SignUpUserForm(ModelForm):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
    
    def __init__(self, *args, **kwargs):
        # first call the 'real' __init__()
        super(SignUpUserForm, self).__init__(*args, **kwargs)
        # then do extra stuff:
        self.fields['username'].help_text = ''
        self.fields['username'].widget = forms.TextInput(attrs={'placeholder': '', 'style': 'font-size: 20', 'class': 'w3-input w3-border'})
        self.fields['email'].widget = forms.EmailInput(attrs={'placeholder': '', 'style': 'font-size: 20', 'class': 'w3-input w3-border'})
        self.fields['password'].widget = forms.PasswordInput(attrs={'placeholder': '', 'style': 'font-size: 20', 'class': 'w3-input w3-border'})
        # self.fields['password'].widget.attrs['class'] = 'form-control'       

