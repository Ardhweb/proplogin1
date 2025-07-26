from django import forms
from django.contrib.auth.models import User

class LoginForm(forms.Form):
    username = forms.CharField(label='Username',widget=forms.TextInput(attrs={'class':'form-control'}))
    password = forms.CharField(widget=forms.PasswordInput(attrs={'class':'form-control'}))

class RegistrationForm(forms.ModelForm):

    password = forms.CharField(label='Password',widget=forms.PasswordInput(attrs={'class':'form-control text-center w-50 '}))
    password2 = forms.CharField(label='Repeat Password', widget=forms.PasswordInput(attrs={'class':'form-control text-center w-50 '}))
    
    class Meta:
        model = User
        fields = ('username', 'email')
        widgets ={'username':forms.TextInput(attrs={'class':'form-control text-center w-50 '}),
        'email':forms.TextInput(attrs={'class':'form-control w-50 '}),
        }
        
    def clean_password2(self):
        cd = self.cleaned_data
        if cd['password'] != cd['password2']:
            raise forms.ValidationError('Passwords don\'t match.')
        return cd['password2']
    
    

            
